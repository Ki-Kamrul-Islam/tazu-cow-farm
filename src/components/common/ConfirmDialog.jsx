import { Modal } from "./Modal.jsx";
import { Button } from "./Button.jsx";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel,
    cancelLabel,
    variant = "danger",
}) {
    const { t } = useLanguage();

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title ?? t("confirmDialog.title")}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose}>
                        {cancelLabel ?? t("confirmDialog.cancelLabel")}
                    </Button>
                    <Button variant={variant} onClick={handleConfirm}>
                        {confirmLabel ?? t("confirmDialog.confirmLabel")}
                    </Button>
                </>
            }
        >
            <p className="text-sm text-text-primary">{message}</p>
        </Modal>
    );
}
