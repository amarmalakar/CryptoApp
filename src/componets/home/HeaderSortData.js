

const HeaderSortData = ({head, data}) => {
    return(
        <div className="mb-6 basis-1/2 md:basis-1/3">
            <h4 className="text-md mb-1">{head}</h4>
            <h2 className="text-2xl">{data}</h2>
        </div>
    )
}

export default HeaderSortData;
