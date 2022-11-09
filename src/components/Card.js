export default function Card({
    handleClickFun = ()=>{},
    imgUrl = 'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    level = 'easy',
    title = 'Freelancer',
    content = 'free $.002 per capcha max 5 capcha perday',
    price = 'Free'
}){
    return(
        <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 p-4">
            <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                <div className="relative pb-48 overflow-hidden">
                    <img className="absolute inset-0 h-full w-full object-cover inline" src={ imgUrl } alt="" />
                </div>
                <div className="p-4">
                    <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">Level { level }</span>
                    <h2 className="mt-2 mb-2  font-bold">{ title }</h2>
                    <p className="text-sm">{ content }</p>
                    <div className="mt-3 flex items-center">
                        <span className="text-sm font-semibold">ab</span>&nbsp;
                        <span className="font-bold text-xl">{ price }</span>&nbsp;<span className="text-sm font-semibold">$</span>
                    </div>
                </div>
                <div className="p-4 flex items-center text-sm text-gray-600">
                    <button 
                        onClick={ handleClickFun }
                        className="bg-white hover:bg-grey-darker hover:text-gray-400 border border-solid border-grey w-full py-2">Start</button>
                </div>
            </div>
        </div>
    )
}