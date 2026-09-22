import { useLanguage } from "../../contexts/LanguageContext.jsx";

export function ComingSoonPage({ titleKey }) {
    const { t } = useLanguage();

    return (
        <div className="text-center text-text-muted">
            <p className="text-xl font-semibold text-text-primary">
                {t(titleKey)}
            </p>
            <p className="mt-2">এই module পরের কোনো Phase-এ তৈরি হবে।</p>
        </div>
    );
}
