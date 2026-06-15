declare module "react-pageflip" {
    import type { ReactNode, Ref } from "react";

    export interface FlipEvent {
        data: number;
        object: unknown;
    }

    export interface HTMLFlipBookProps {
        width: number;
        height: number;
        size?: "fixed" | "stretch";
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
        drawShadow?: boolean;
        flippingTime?: number;
        usePortrait?: boolean;
        startZIndex?: number;
        autoSize?: boolean;
        maxShadowOpacity?: number;
        showCover?: boolean;
        mobileScrollSupport?: boolean;
        swipeDistance?: number;
        clickEventForward?: boolean;
        useMouseEvents?: boolean;
        showPageCorners?: boolean;
        disableFlipByClick?: boolean;
        className?: string;
        style?: React.CSSProperties;
        children: ReactNode;
        ref?: Ref<unknown>;
        onFlip?: (event: FlipEvent) => void;
        onChangeOrientation?: (event: { data: string }) => void;
        onChangeState?: (event: { data: string }) => void;
        onInit?: (event: { data: unknown }) => void;
        onUpdate?: (event: { data: unknown }) => void;
    }

    export default function HTMLFlipBook(props: HTMLFlipBookProps): JSX.Element;
}
