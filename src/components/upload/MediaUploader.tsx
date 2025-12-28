'use client';

// Fixed: Import React to resolve namespace errors
import React from 'react';
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  uploadMedia,
  deleteMedia,
  formatFileSize,
  formatDuration,
  getFileMetadata,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_FILE_SIZES,
} from '@/lib/storage';

// ============================================
// Types
// ============================================

export interface MediaItem {
  id: string;
  url: string;
  thumbnailUrl?: string;
  path: string;
  mediaType: 'image' | 'video';
  fileName: string;
  fileSize: number;
  duration?: number;
}

interface MediaUploaderProps {
  userId: string;
  folder?: string;
  maxFiles?: number;
  initialMedia?: MediaItem[];
  onUploadComplete?: (media: MediaItem[]) => void;
  onError?: (error: string) => void;
  accept?: 'image' | 'video' | 'all';
  className?: string;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
  result?: MediaItem;
}

// ============================================
// Component
// ============================================

export function MediaUploader({
  userId,
  folder = 'lessons',
  maxFiles = 10,
  initialMedia = [],
  onUploadComplete,
  onError,
  accept = 'all',
  className = '',
}: MediaUploaderProps) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [uploadingFiles, set