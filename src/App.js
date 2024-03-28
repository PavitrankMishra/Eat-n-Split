import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddFriend() {
    setAddFriend((show) => !show);
  }

  function handleFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setAddFriend(false);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend handleFriend={handleFriend} />}
        {
          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add Friend"}
          </Button>
        }
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.name}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  function handleClick() {
    onSelection(friend);
  }

  if (!friend) {
    return null;
  }

  console.log(friend.id);
  // console.log(selectedFriend.id);
  if (!friend) {
    return null;
  }
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">You owe me ${Math.abs(friend.balance)}</p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button onClick={handleClick}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}
function FormAddFriend({ handleFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    if (!name || !image) return;
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    console.log(newFriend);
    handleFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <p>🙎Friend Name</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <p>📷Image Url</p>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add Friend</Button>
    </form>
  );
}
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [WhoIsPaying, setWhoIsPaying] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(WhoIsPaying === "user" ? paidByFriend : -paidByFriend);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      ></input>

      <label>{selectedFriend.name} Expense</label>
      <input type="text" disabled value={paidByFriend}></input>

      <label>Who is paying the bill?</label>
      <select
        value={WhoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
export default App;
// import { useState } from "react";

// function App() {
//   const [friend, setFriend] = useState(initialFriends);
//   const [showAddFriend, setShowAddFriend] = useState(false);
//   function handleShowFriend() {
//     setShowAddFriend((show) => !show);
//   }

//   function handleAddFriend({ friend }) {
//     setFriend((friends) => [...friends, friend]);
//   }
//   return (
//     <div className="app">
//       <div className="sidebar">
//         <Friend friends={friend} />
//         {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
//         <Button onClick={handleShowFriend}>
//           {showAddFriend ? "Close" : "Add Friend"}
//         </Button>
//       </div>
//       <FormSplitBill />
//     </div>
//   );
// }

// function Friend({ friends }) {
//   // const data = initialFriends;
//   return (
//     <div>
//       {friends.map((friend) => (
//         <FriendList friend={friend} />
//       ))}
//     </div>
//   );
// }
// function FriendList({ friend }) {
//   return (
//     <li>
//       <img src={friend.image} alt={friend.name}></img>
//       <h3>{friend.name}</h3>

//       {friend.balance < 0 && (
//         <p className="red">
//           You owe {friend.name} ${Math.abs(friend.balance)}
//         </p>
//       )}

//       {friend.balance > 0 && (
//         <p className="green">
//           You owe {Friend.name} ${Math.abs(friend.balance)}
//         </p>
//       )}
//       {friend.balance === 0 && <p>You and {friend.name} are even </p>}
//       <Button>Select</Button>
//     </li>
//   );
// }

// function Button({ children, onClick }) {
//   return (
//     <button className="button" onClick={onClick}>
//       {children}
//     </button>
//   );
// }
// function FormAddFriend({ onAddFriend }) {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState("https://i.pravatar.cc/48");
//   function handleSubmit(e) {
//     e.preventDefault();
//     const id = crypto.randomUUID();

//     if (!name || !image) return;
//     const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };
//     console.log(newFriend);

//     onAddFriend(newFriend);

//     setName("");
//     setImage("https://i.pravatar.cc/48");
//   }
//   return (
//     <form className="form-add-friend" onSubmit={handleSubmit}>
//       <label>🧑‍🤝‍🧑Friend</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label>📷 Image Url</label>
//       <input
//         type="text"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />
//       <Button>Add</Button>
//     </form>
//   );
// }
