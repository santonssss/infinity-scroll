import React from "react";

type UserCardProps = {
  user: {
    userId: string;
    username: string;
    email: string;
    avatar: string;
    birthdate: Date;
    registeredAt: Date;
  };
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="col-md-4 mb-4" key={user.userId}>
      <div className="card">
        <img
          src={user.avatar}
          alt={`${user.username} avatar`}
          className="card-img-top"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="card-text">
            <strong>Дата рождения:</strong>{" "}
            {user.birthdate.toLocaleDateString()}
          </p>
          <p className="card-text">
            <strong>Зарегистрирован:</strong>{" "}
            {user.registeredAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
