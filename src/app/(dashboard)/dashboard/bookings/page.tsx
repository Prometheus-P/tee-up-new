'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getMyBookings } from '@/actions';
import { formatKRW } from '@/lib/payments';

interface Booking {
  id: string;
  pro_id: string;
  start_at: string;
  end_at: string;
  status: string;
  payment_status: string;
  price_amount: number | null;
  guest_name: string | null;
  customer_notes: string | null;
  refund_requested_at: string | null;
  refund_amount: number;
  dispute_status: string | null;
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');

  useEffect(() => {
    async function loadBookings() {
      const result = await getMyBookings();
      if (result.success) {
        setBookings(result.data as unknown as Booking[]);
      }
      setIsLoading(false);
    }
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const now = new Date();
    const startAt = new Date(booking.start_at);

    switch (filter) {
      case 'upcoming':
        return startAt > now && booking.status !== 'cancelled';
      case 'past':
        return startAt <= now || booking.status === 'completed';
      case 'cancelled':
        return booking.status === 'cancelled';
      default:
        return true;
    }
  });

  const getStatusBadge = (booking: Booking) => {
    if (booking.dispute_status) {
      return <StatusBadge variant="disputed">분쟁 진행중</StatusBadge>;
    }
    if (booking.refund_requested_at && booking.payment_status !== 'refunded') {
      return <StatusBadge variant="pending">환불 요청됨</StatusBadge>;
    }
    if (booking.payment_status === 'refunded') {
      return <StatusBadge variant="refunded">환불 완료</StatusBadge>;
    }
    switch (booking.status) {
      case 'confirmed':
        return <StatusBadge variant="confirmed">확정됨</StatusBadge>;
      case 'pending':
        return <StatusBadge variant="pending">대기중</StatusBadge>;
      case 'completed':
        return <StatusBadge variant="completed">완료됨</StatusBadge>;
      case 'cancelled':
        return <StatusBadge variant="cancelled">취소됨</StatusBadge>;
      default:
        return null;
    }
  };

  const canRequestRefund = (booking: Booking) => {
    return (
      booking.payment_status === 'paid' &&
      !booking.refund_requested_at &&
      !booking.dispute_status &&
      booking.status !== 'completed'
    );
  };

  const canOpenDispute = (booking: Booking) => {
    return !booking.dispute_status && booking.status !== 'cancelled';
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-tee-accent-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-tee-ink-strong">내 예약</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'upcoming', 'past', 'cancelled'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-tee-accent-primary text-white'
                : 'bg-tee-surface text-tee-ink-light hover:bg-tee-stone'
            }`}
          >
            {f === 'all' && '전체'}
            {f === 'upcoming' && '예정된 예약'}
            {f === 'past' && '지난 예약'}
            {f === 'cancelled' && '취소된 예약'}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-tee-ink-light">예약이 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {new Date(booking.start_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'short',
                    })}
                  </CardTitle>
                  <p className="text-sm text-tee-ink-light">
                    {new Date(booking.start_at).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    -{' '}
                    {new Date(booking.end_at).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {getStatusBadge(booking)}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    {booking.price_amount && (
                      <p className="text-sm text-tee-ink-light">
                        결제 금액: {formatKRW(booking.price_amount)}원
                      </p>
                    )}
                    {booking.refund_amount > 0 && (
                      <p className="text-sm text-purple-600">
                        환불 금액: {formatKRW(booking.refund_amount)}원
                      </p>
                    )}
                    {booking.customer_notes && (
                      <p className="text-sm text-tee-ink-light">
                        메모: {booking.customer_notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {canRequestRefund(booking) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/dashboard/bookings/${booking.id}/refund`)
                        }
                      >
                        환불 요청
                      </Button>
                    )}
                    {canOpenDispute(booking) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          router.push(`/dashboard/bookings/${booking.id}/dispute`)
                        }
                      >
                        분쟁 신청
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
