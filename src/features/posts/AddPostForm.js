import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { postAdded } from "./postsSlice";


const AddPostForm = () => {
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('')

    const onAddTitle = e => setTitle(e.target.value)
    const onAddContent = e => setContent(e.target.value)
    const onChangeAuthor = e => setUserId(e.target.value)
    
    const onSave = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )
            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

    return (
        <form>
            <label htmlFor="postTitle">Post Title :</label>
            <input 
                type="text" 
                name="postTitle" 
                value={title} 
                onChange={onAddTitle}
                id="postTitle"
            />
            <label htmlFor="postAuthor">Author :</label>
            <select id="postAuthor" value={userId} onChange={onChangeAuthor}>
                <option value=''></option>
                {usersOptions}
            </select>
            <label htmlFor="postContent">Content :</label>
            <textarea
                name="postContent"
                id="postContent"
                value={content}
                onChange={onAddContent}
            />
            <button 
                type="button" 
                onClick={onSave}
                disabled={!canSave}
            >Save Post</button>
        </form>
    )
}

export default AddPostForm;