'use client';

/**
 * Card data structure for the Stack component
 * 
 * @property id - Unique identifier for the card
 * @property img - URL of the image to display on the card
 * 
 * @example
 * ```tsx
 * const cardData = {
 *   id: 1,
 *   img: 'https://example.com/image.jpg'
 * };
 * ```
 */
export interface CardData {
  id: number;
  img: string;
}

/**
 * Props for the CardRotate component
 * 
 * @property children - React children to be rendered inside the card
 * @property onSendToBack - Callback function when the card should be sent to the back of the stack
 * @property sensitivity - Number of pixels the card needs to be dragged to trigger sending to back
 * 
 * @example
 * ```tsx
 * <CardRotate onSendToBack={() => console.log('Sent to back')} sensitivity={200}>
 *   <div>Card content</div>
 * </CardRotate>
 * ```
 */
export interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

/**
 * Animation configuration for the Stack component
 * 
 * @property stiffness - Spring stiffness value for the animation (higher = faster)
 * @property damping - Spring damping value for the animation (higher = less bounce)
 * 
 * @example
 * ```tsx
 * const animationConfig = {
 *   stiffness: 260,
 *   damping: 20
 * };
 * ```
 */
export interface AnimationConfig {
  stiffness: number;
  damping: number;
}

/**
 * Card dimensions for the Stack component
 * 
 * @property width - Width of the cards in pixels
 * @property height - Height of the cards in pixels
 * 
 * @example
 * ```tsx
 * const cardDimensions = {
 *   width: 300,
 *   height: 200
 * };
 * ```
 */
export interface CardDimensions {
  width: number;
  height: number;
}

/**
 * Props for the Stack component
 * 
 * @property randomRotation - Whether to apply a random rotation to each card
 * @property sensitivity - Number of pixels the card needs to be dragged to trigger sending to back
 * @property cardDimensions - Width and height of the cards
 * @property sendToBackOnClick - Whether to send the card to the back when clicked
 * @property cardsData - Array of card data to display
 * @property animationConfig - Configuration for the stack animation
 * 
 * @example
 * ```tsx
 * <Stack
 *   randomRotation={true}
 *   sensitivity={200}
 *   cardDimensions={{ width: 300, height: 200 }}
 *   sendToBackOnClick={true}
 *   cardsData={[
 *     { id: 1, img: 'https://example.com/image1.jpg' },
 *     { id: 2, img: 'https://example.com/image2.jpg' }
 *   ]}
 *   animationConfig={{ stiffness: 260, damping: 20 }}
 * />
 * ```
 */
export interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: CardDimensions;
  sendToBackOnClick?: boolean;
  cardsData?: CardData[];
  animationConfig?: AnimationConfig;
}
