import { CustomLoader } from '@/app/api/routes/route';
export default function Loading() {
    return (
        <div className="loader-container">
            <CustomLoader />
        </div>
    );
}