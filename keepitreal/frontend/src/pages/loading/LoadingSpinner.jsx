function LoadingSpinner( { message }) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30 gap-4">
            <div role="status">
                {/* from https://tailwindcss.com/docs/animation#adding-a-spin-animation */}
                <svg className="mr-3 size-5 animate-spin w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full" viewBox="0 0 24 24"></svg>
            </div>

            {message && (
                <h2>{message}</h2>
            )}

        </div>
    );
};

export default LoadingSpinner;