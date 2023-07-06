import { dbService } from "fbase";
import { useEffect, useState } from "react";

const NoticeUpdatePage = ({}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(false);
  const [newBody, setNewBody] = useState(false);
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc().update({
      text: newTitle,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="New Title"
              value={newTitle}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update" />
          </form>

          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : null}
    </div>
  );
};
