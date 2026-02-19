function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
            <div role="status">
                {/* from https://tailwindcss.com/docs/animation#adding-a-spin-animation */}
                <svg className="mr-3 size-5 animate-spin w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full" viewBox="0 0 24 24"></svg>
            </div>
        </div>
    );
};

export default LoadingSpinner;