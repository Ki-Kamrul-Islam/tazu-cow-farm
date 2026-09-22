import { Modal } from "./Modal.jsx";
import { Button } from "./Button.jsx";

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "নিশ্চিত করুন",
    message,
    confirmLabel = "নিশ্চিত করুন",
    cancelLabel = "বাতিল",
    variant = "danger",
}) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose}>
                        {cancelLabel}
                    </Button>
                    <Button variant={variant} onClick={handleConfirm}>
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            <p className="text-sm text-text-primary">{message}</p>
        </Modal>
    );
}
