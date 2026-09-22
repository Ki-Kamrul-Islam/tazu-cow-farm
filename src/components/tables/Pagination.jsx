import { Button } from "../common/Button.jsx";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

export function Pagination({ currentPage, totalPages, onPageChange }) {
    const { t } = useLanguage();

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-text-muted">
                {t("common.pageOf", {
                    current: currentPage,
                    total: totalPages,
                })}
            </span>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    {t("common.previous")}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    {t("common.next")}
                </Button>
            </div>
        </div>
    );
}
