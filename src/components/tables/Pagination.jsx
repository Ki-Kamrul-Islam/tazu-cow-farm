import { Button } from "../common/Button.jsx";

export function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-text-muted">
                Page {currentPage} of {totalPages}
            </span>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    আগের
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    পরের
                </Button>
            </div>
        </div>
    );
}
