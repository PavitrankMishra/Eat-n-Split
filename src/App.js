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
  const friends = initialFriends;
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList({ friends }) {
  return friends.map((friend) => <Friend friend={friend} key={friend.name} />);
}

function Friend({ friend }) {
  return (
    <>
      <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {friend.balance}
          </p>
        )}

        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      </li>
    </>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>Friend Name</label>
      <input type="text"></input>

      <label>📷Image Url</label>
      <input type="text"></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>Bill Value</label>
      <input type="text"></input>

      <label>Your Expense</label>
      <input type="text"></input>

      <label>X Expense</label>
      <input type="text" disabled></input>

      <label>Who is paying the bill ?</label>
      <select>
        <option>You</option>
        <option>X</option>
      </select>
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
