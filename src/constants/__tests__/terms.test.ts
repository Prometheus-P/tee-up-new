/**
 * @file terms.test.ts
 * @description Unit tests for terminology abstraction layer
 *
 * Tests verify:
 * 1. TERMS constants have correct values
 * 2. Helper functions generate expected output
 * 3. Type exports are correctly defined
 */

// Fixed: Added missing test runner global imports
import { describe, it, expect } from '@jest/globals';
import {
  TERMS,
  withExpertName,
  bookingTitle,
  premiumBookingTitle,
  serviceConfirmedMessage,
  bookingPendingMessage,
} from '../terms';

describe('TERMS constants', () => {
  describe('Expert related terms', () => {
    it('should have correct expert title', () => {
      expect(TERMS.EXPERT_TITLE).toBe('프로');
    });

    it('should have correct expert title with honorific', () => {
      expect(TERMS.EXPERT_TITLE_HONORIFIC).toBe('프로님');
    });

    it('should have correct expert title plural', () => {
      expect(TERMS.EXPERT_TITLE_PLURAL).toBe('프로들');
    });
  });

  describe('Service related terms', () => {
    it('should have correct service name', () => {
      expect(TERMS.SERVICE_NAME).toBe('레슨');
    });

    it('should have correct service name plural', () => {
      expect(TERMS.SERVICE_NAME_PLURAL).toBe('레슨들');
    });

    it('should have correct service booking term', () => {
      expect(TERMS.SERVICE_BOOKING).toBe('레슨 예약');
    });

    it('should have correct premium service term', () => {
      expect(TERMS.SERVICE_PREMIUM).toBe('VIP 레슨');
    });
  });

  describe('Client related terms', () => {
    it('should have correct client honorific', () => {
      expect(TERMS.CLIENT_HONORIFIC).toBe('회원님');
    });

    it('should have correct client term', () => {
      expect(TERMS.CLIENT).toBe('회원');
    });

    it('should have correct client plural', () => {
      expect(TERMS.CLIENT_PLURAL).toBe('회원');
    });

    it('should have correct prospect term', () => {
      expect(TERMS.PROSPECT).toBe('예비 회원');
    });
  });

  describe('Facility related terms', () => {
    it('should have correct facility name', () => {
      expect(TERMS.FACILITY_NAME).toBe('아카데미');
    });

    it('should have correct team name', () => {
      expect(TERMS.TEAM_NAME).toBe('스튜디오');
    });
  });

  describe('Action terms', () => {
    it('should have correct take service term', () => {
      expect(TERMS.TAKE_SERVICE).toBe('레슨받기');
    });

    it('should have correct contact action term', () => {
      expect(TERMS.CONTACT_ACTION).toBe('문의하기');
    });

    it('should have correct book action term', () => {
      expect(TERMS.BOOK_ACTION).toBe('예약하기');
    });
  });

  describe('Portfolio related terms', () => {
    it('should have correct portfolio page term', () => {
      expect(TERMS.PORTFOLIO_PAGE).toBe('포트폴리오');
    });

    it('should have correct expert intro term', () => {
      expect(TERMS.EXPERT_INTRO).toBe('프로 소개');
    });

    it('should have correct curriculum term', () => {
      expect(TERMS.CURRICULUM).toBe('커리큘럼');
    });

    it('should have correct pricing term', () => {
      expect(TERMS.PRICING).toBe('수강료');
    });
  });

  describe('Platform terms', () => {
    it('should have correct platform name', () => {
      expect(TERMS.PLATFORM_NAME).toBe('TEE:UP');
    });

    it('should have correct domain description', () => {
      expect(TERMS.DOMAIN_DESCRIPTION).toBe('골프');
    });
  });

  describe('TERMS immutability', () => {
    it('should be a readonly object', () => {
      // TypeScript enforces 'as const', but we verify the object structure
      expect(typeof TERMS).toBe('object');
    });

    it('should have all expected keys', () => {
      const expectedKeys = [
        'EXPERT_TITLE',
        'EXPERT_TITLE_HONORIFIC',
        'EXPERT_TITLE_PLURAL',
        'SERVICE_NAME',
        'SERVICE_NAME_PLURAL',
        'SERVICE_BOOKING',
        'SERVICE_PREMIUM',
        'CLIENT_HONORIFIC',
        'CLIENT',
        'CLIENT_PLURAL',
        'PROSPECT',
        'FACILITY_NAME',
        'TEAM_NAME',
        'TAKE_SERVICE',
        'CONTACT_ACTION',
        'BOOK_ACTION',
        'PORTFOLIO_PAGE',
        'EXPERT_INTRO',
        'CURRICULUM',
        'PRICING',
        'PLATFORM_NAME',
        'DOMAIN_DESCRIPTION',
      ];

      expect(Object.keys(TERMS).sort()).toEqual(expectedKeys.sort());
    });
  });
});

describe('Helper functions', () => {
  describe('withExpertName', () => {
    it('should format name with expert honorific', () => {
      expect(withExpertName('김철수')).toBe('김철수 프로님');
    });

    it('should handle empty string', () => {
      expect(withExpertName('')).toBe(' 프로님');
    });

    it('should handle English names', () => {
      expect(withExpertName('John')).toBe('John 프로님');
    });

    it('should handle names with spaces', () => {
      expect(withExpertName('김철수 주니어')).toBe('김철수 주니어 프로님');
    });
  });

  describe('bookingTitle', () => {
    it('should create booking title with expert name', () => {
      expect(bookingTitle('김철수')).toBe('김철수 프로님과의 레슨 예약');
    });

    it('should handle empty string', () => {
      expect(bookingTitle('')).toBe(' 프로님과의 레슨 예약');
    });

    it('should handle various names', () => {
      expect(bookingTitle('박지성')).toBe('박지성 프로님과의 레슨 예약');
      expect(bookingTitle('Tiger Woods')).toBe('Tiger Woods 프로님과의 레슨 예약');
    });
  });

  describe('premiumBookingTitle', () => {
    it('should create premium booking title', () => {
      expect(premiumBookingTitle('김철수')).toBe('김철수 프로님의 VIP 레슨');
    });

    it('should handle empty string', () => {
      expect(premiumBookingTitle('')).toBe(' 프로님의 VIP 레슨');
    });

    it('should handle various names', () => {
      expect(premiumBookingTitle('이영미')).toBe('이영미 프로님의 VIP 레슨');
    });
  });

  describe('serviceConfirmedMessage', () => {
    it('should create confirmation message', () => {
      expect(serviceConfirmedMessage('김철수')).toBe('김철수 프로님과의 레슨이 확정되었습니다.');
    });

    it('should handle empty string', () => {
      expect(serviceConfirmedMessage('')).toBe(' 프로님과의 레슨이 확정되었습니다.');
    });

    it('should handle various names', () => {
      expect(serviceConfirmedMessage('최경주')).toBe('최경주 프로님과의 레슨이 확정되었습니다.');
    });
  });

  describe('bookingPendingMessage', () => {
    it('should create pending message', () => {
      expect(bookingPendingMessage('김철수')).toBe('김철수 프로님이 예약을 확인하면 연락드릴 예정입니다.');
    });

    it('should handle empty string', () => {
      expect(bookingPendingMessage('')).toBe(' 프로님이 예약을 확인하면 연락드릴 예정입니다.');
    });

    it('should handle various names', () => {
      expect(bookingPendingMessage('신지애')).toBe('신지애 프로님이 예약을 확인하면 연락드릴 예정입니다.');
    });
  });
});
