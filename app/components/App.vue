<template>
  <Page style="background-color: white;">
    <ActionBar title="Everything Food: Grocery Lists" />

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
          <TextField v-model="chargeName" hint="Enter Task Name" />
          <Label text="Start Time" />
          <FlexboxLayout style="justify-content: center">
            <TimePicker :hour="taskToAdd.timeH" :minute="taskToAdd.timeM" />
          </FlexboxLayout>
          <Label text="End Time" />
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
export default {
  data() {
    return {
      active: false,
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
        timeH: 4,
        timeM: 40,
        militaryT: 440
      }
    };
  },
  methods: {
    onButtonTap() {
      // What if I inserted the new item into the array, then sorted that array and called it a day? Using Military time though?
      this.notActive = false;
      this.activeTask = true;
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
    }
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
