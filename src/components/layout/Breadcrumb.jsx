import { Link } from "react-router-dom";

export function Breadcrumb({ items }) {
    return (
        <nav className="flex items-center gap-1 text-sm text-text-muted mb-3">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <span key={index} className="flex items-center gap-1">
                        {item.path && !isLast ?
                            <Link
                                to={item.path}
                                className="hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        :   <span
                                className={
                                    isLast ?
                                        "text-text-primary font-medium"
                                    :   ""
                                }
                            >
                                {item.label}
                            </span>
                        }
                        {!isLast && <span className="mx-1">/</span>}
                    </span>
                );
            })}
        </nav>
    );
}
