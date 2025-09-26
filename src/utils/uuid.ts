import { uuidv7 } from 'uuidv7'

/**
 * Generate a new UUIDv7 and return as Buffer (BINARY(16) for MySQL).
 */
export function generateUuidV7Buffer(): Buffer {
  return uuidToBuffer(uuidv7());
}

/**
 * Convert UUID string (e.g. '018f22b1-6a78-7c0c-8e7a-1b6c16dabe59') to Buffer.
 */
export function uuidToBuffer(uuid: string): Buffer {
  return Buffer.from(uuid.replace(/-/g, ''), 'hex')
}

/**
 * Convert Buffer (BINARY(16)) back to UUID string.
 */
export function bufferToUuid(data: Uint8Array): string {
  // Use Buffer to access the convenient 'hex' encoding
  const buffer = Buffer.from(data);

  // 1. Convert the 16-byte buffer to a 32-character hex string
  const hex = buffer.toString('hex');

  // 2. Insert hyphens at the correct positions (8-4-4-4-12)
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
