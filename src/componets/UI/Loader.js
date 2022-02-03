const Loader = () => {
    let circleCommonClasses = 'h-4 w-4 border-2 border-current rounded-full';

    return (
        <div className='flex space-x-2 justify-center py-8'>
            <div className={`${circleCommonClasses} animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
};

export default Loader;