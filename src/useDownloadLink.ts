import { useRef, useCallback, MouseEvent } from 'react';
import { RawCSVExport } from './types';

export type DownloadProps = {
    onStart?: () => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    asyncResolver?: () => Promise<RawCSVExport>;
};

export const useDownloadLink = ({ asyncResolver, onStart, onSuccess, onError }: DownloadProps) => {
    const elementRef = useRef<HTMLAnchorElement | null>(null);

    const renderTempLink = useCallback((data: RawCSVExport, filename: any) => {
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('style', 'display: none');
        link.href = URL.createObjectURL(new Blob([data.file], { type: data.type }));
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        link.remove();
    }, []);

    const handleOnClick = useCallback(
        async (e: MouseEvent<HTMLAnchorElement>) => {
            onStart?.();

            if (asyncResolver) {
                e.preventDefault();

                try {
                    const csvData = await asyncResolver();
                    onSuccess?.();
                    renderTempLink(csvData, elementRef.current?.download);
                } catch (e: any) {
                    onError?.(e);
                }
            }
        },
        [asyncResolver, renderTempLink, onError, onStart, onSuccess],
    );

    const getProps = useCallback(() => {
        return {
            linkRef: elementRef,
            onClick: handleOnClick,
        };
    }, [handleOnClick]);

    return {
        getProps,
    };
};
