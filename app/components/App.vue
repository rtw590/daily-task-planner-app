<template>
  <Page style="background-color: white;">
    <ActionBar title="Daily Task Planner" />

    <ScrollView>
      <StackLayout
        style="padding-left: 30px; padding-right: 30px; padding-top: 0px; padding-bottom: 20px;"
      >
        <StackLayout>
          <FlexboxLayout style="justify-content: flex-end">
            <Button
              text="New Task"
              @tap="onButtonTap"
              backgroundColor="rgb(255, 171, 45)"
              color="white"
              style="font-size: 16px; font-weight: bold; margin: 20px; padding: 40px;"
            />
          </FlexboxLayout>
        </StackLayout>

        <StackLayout v-bind:class="{ active: active, notActive: notActive }">
          <FlexboxLayout>
            <TextField v-model="chargeName" hint="Enter Task Name" style="flex-grow: 1;" />
            <Button
              text="Cancel"
              @tap="cancel"
              backgroundColor="rgb(235, 64, 52)"
              color="white"
              style="font-size: 12px; font-weight: bold; margin: 5px; padding: 40px;"
            />
            <Button
              text="Save"
              @tap="onButtonTap"
              backgroundColor="rgb(49, 85, 232)"
              color="white"
              style="font-size: 12px; font-weight: bold; margin: 5px; padding: 40px;"
            />
          </FlexboxLayout>
          <Label text="Start Time" style="text-align: center;" />
          <FlexboxLayout style="justify-content: center">
            <TimePicker :hour="taskToAdd.timeH" :minute="taskToAdd.timeM" />
          </FlexboxLayout>
          <Label text="End Time" style="text-align: center;" />
          <FlexboxLayout style="justify-content: center">
            <TimePicker :hour="taskToAdd.timeH" :minute="taskToAdd.timeM" />
          </FlexboxLayout>
        </StackLayout>

        <StackLayout>
          <Label :text="task.text" v-for="task in this.tasks" v-bind:key="task.id" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script >
const { sequelize } = require("../models");
export default {
  data() {
    return {
      notActive: true,
      tasks: [
        {
          id: 1,
          text: "Number 1",
          timeH: 3,
          timeM: 5,
          militaryT: 305,
          color: "red"
        },
        {
          id: 2,
          text: "Number 2",
          timeH: 4,
          timeM: 30,
          militaryT: 435,
          color: "red"
        },
        {
          id: 3,
          text: "Number 3",
          timeH: 5,
          timeM: 5,
          militaryT: 505,
          color: "red"
        }
      ],
      taskToAdd: {
        id: 4,
        text: "Number 4",
        color: "blue",
        startTimeH: 4,
        startTimeM: 40,
        startTimeMilitary: 440,
        endTimeH: 4,
        endTimeM: 40,
        endTimeMilitary: 440
      },
      firstname: "rob",
      lastname: "waller"
    };
  },
  methods: {
    onButtonTap() {
      // What if I inserted the new item into the array, then sorted that array and called it a day? Using Military time though?
      this.notActive = false;
      // this.activeTask = true;
      let militaryTimeArray = [];
      this.tasks.forEach((task, index) => {
        militaryTimeArray.push(task.militaryT);
      });

      militaryTimeArray.push(this.taskToAdd.militaryT);

      militaryTimeArray.sort();

      let matchedIndex = null;
      militaryTimeArray.forEach((value, index) => {
        if (value == this.taskToAdd.militaryT) {
          matchedIndex = index;
        }
      });
      console.log(matchedIndex);
      this.tasks.splice(matchedIndex, 0, this.taskToAdd);
    },
    cancel() {
      console.log("cancel ran");
      this.notActive = true;
      // this.activeTask = false;
    }
  },
  mounted() {
    console.log("mounted ran");
    new Sqlite("my.db").then(
      db => {
        db.execSQL(
          "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)"
        ).then(
          id => {
            context.commit("init", { database: db });
          },
          error => {
            console.log("CREATE TABLE ERROR", error);
          }
        );
      },
      error => {
        console.log("OPEN DB ERROR", error);
      }
    );
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.active {
  visibility: visible;
}

.notActive {
  visibility: collapse;
}
</style>
