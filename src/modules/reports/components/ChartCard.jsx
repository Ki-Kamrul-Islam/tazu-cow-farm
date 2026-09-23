import { Card } from "../../../components/common/Card.jsx";

export function ChartCard({ title, children }) {
    return (
        <Card>
            <h3 className="text-sm font-semibold text-text-primary mb-3">
                {title}
            </h3>
            <div className="h-72">{children}</div>
        </Card>
    );
}
