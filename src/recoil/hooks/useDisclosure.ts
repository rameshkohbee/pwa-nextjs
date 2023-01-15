import { useCallback, useState } from "react";

export function useDisclosure(): {
    isOpen: boolean;
    onOpen: any;
    onClose: any;
    toggle: any;
} {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Info: onOpen is used to open modal/drawer
     */
    const onOpen = useCallback(() => {
        setIsOpen((pre) => (pre ? pre : !pre));
    }, [isOpen]);

    /**
     * Info: onClose is used to close modal/drawer
     */
    const onClose = useCallback(() => {
        setIsOpen((pre) => (pre ? !pre : pre));
    }, [isOpen]);

    /**
     * Info: toggle is used to toggle modal/drawer
     */
    const toggle = useCallback(() => {
        setIsOpen((pre) => !pre);
    }, [isOpen]);

    return { isOpen, onOpen, onClose, toggle };
}
