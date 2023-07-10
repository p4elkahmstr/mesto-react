import { useEffect, useState } from "react"
import api from "../../utils/api"

export default function LikeButton({ likes, myid, cardid }) {
    const [isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes.length)

    useEffect(() => {
        setIsLike(likes.some(element => myid === element._id))
    }, [likes, myid])

    function handleLike() {
        if (isLike) {
            api.deleteLike(cardid)
            .then(res => {
                setIsLike(false)
                setCount(res.likes.length)
            })
            .catch((err) => console.log(err))
        } else {
            api.addLike(cardid)
            .then(res => {
                setIsLike(true)
                setCount(res.likes.length)
            })
            .catch((err) => console.log(err))
        }
    }

    return (
        <>
            <button className={`element__like ${isLike ? 'element__like_active' : ''}`} type="button" onClick={handleLike} />
            <span className="element__likes">{count}</span>
        </>
    )
}