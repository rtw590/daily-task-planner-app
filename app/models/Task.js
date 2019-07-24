module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    name: DataTypes.INTEGER,
    startTimeH: DataTypes.INTEGER,
    startTimeM: DataTypes.INTEGER,
    startTimeMilitary: DataTypes.INTEGER,
    endTimeH: DataTypes.INTEGER,
    endTimeM: DataTypes.INTEGER,
    endTimeMilitary: DataTypes.INTEGER,
    color: DataTypes.TEXT
  });

  return Task;
};
