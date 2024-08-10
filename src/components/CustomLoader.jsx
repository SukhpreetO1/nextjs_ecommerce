import { Image } from '@/app/api/routes/route';

export default function CustomLoader () {
    return (
        <div>
            <div className="loader-container">
                <Image src="/assets/images/loader.gif" className="custom_loader" width={0} height={0} alt="Loader" />
            </div>
        </div>
    )
}
