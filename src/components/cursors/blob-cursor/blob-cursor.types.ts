/**
 * BlobCursor Component Types
 *
 * Types used by the BlobCursor component.
 */

/**
 * Props for the BlobCursor component.
 */
export interface BlobCursorProps {
  /**
   * Type of blob shape ('circle' or other shapes)
   * @default 'circle'
   */
  blobType?: string;

  /**
   * Fill color for the blob elements
   * @default '#00f0ff'
   */
  fillColor?: string;
}

/**
 * Size properties for a blob element.
 */
export interface BlobSize {
  /**
   * Width of the blob in pixels.
   */
  width: number;

  /**
   * Height of the blob in pixels.
   */
  height: number;
}

/**
 * Style properties for blob highlights.
 */
export interface HighlightStyle {
  /**
   * Top position in pixels.
   */
  top: number;

  /**
   * Left position in pixels.
   */
  left: number;

  /**
   * Width of the highlight in pixels.
   */
  width: number;

  /**
   * Height of the highlight in pixels.
   */
  height: number;
}

/**
 * Position coordinates.
 */
export interface Position {
  /**
   * X-coordinate (left).
   */
  left: number;

  /**
   * Y-coordinate (top).
   */
  top: number;
}
