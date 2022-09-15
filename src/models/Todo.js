module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      underscored: true
    }
  );

  Todo.associate = db => {
    Todo.belongsTo(db.User, {
      foreignKey: {
        allowNull: false,
        name: 'userId'
      },
      onDelete: 'RESTRICT'
    });
  };

  return Todo;
};
