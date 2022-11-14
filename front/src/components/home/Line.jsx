function Line({ comment} ) {


console.log(comment)

    return (
        <li className="list-group-item">
            
            <div className="home">
                <div className="home__content">
                    <div className="home__content__title">
                        <h2 className="home__content__name">{comment.savName}</h2>
                        {comment.title}
                    </div>
                    <div className="home__content__comment">{comment.komentaras}</div>
                </div>
            </div>
        </li>
    )
}

export default Line;