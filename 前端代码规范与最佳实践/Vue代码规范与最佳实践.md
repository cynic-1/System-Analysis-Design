## Table of Index

 

[**1. Make sure to use key Inside v-for**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#1)

 

[**2. Use Actions: Commit the Data and Make API Calls**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#2)

 

[**3. Naming Commits – Follow a Single Convention**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#3)

 

[**4. Multiple V-Condition**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#4)

 

[**5. Third-Part Packages**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#5)

 

[**6. Stay Consistent – Directive Shorthand**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#6)

 

[**7. Code Splitting**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#7)

 

[**8. Routing**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#8)

 

[**9. Avoid to Access the DOM Directly**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#9)

 

[**10. Add Multiple Classes to an Element**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#10)

 

[**11. kebab-case for Event Names**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#11)

 

[**12. Use Selectors**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#12)

 

[**13. Validate Your Props**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#13)

 

[**14. Appropriate Structure**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#14)

 

[**15. Clean up After Yourself**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#15)

 

[**16. Wrapping Up**](https://www.bacancytechnology.com/blog/vue-js-best-practices/#16)







## Top 15 Vue.js Best Practices in 2021

## #1 Make sure to use key Inside v-for

Using key attributes along with the directive can help your app to be predictable and persistent; howsoever small changes you make in the data. This is essential, so it’s convenient to track your components and have an accurate reference to your diverse elements.

 

Without Keys, there’s no surety about how DOM elements can appear, and there isn’t assurance about their predictable behaviors. But, if you maintain to have a unique key for each component, then it’s easy to predict how Vue application will handle DOM manipulation.



```
< !-- BAD -- >
< div v-for=features in features' >  < / div >
 
< !-- GOOD! -- >
< div v-for= features in features' :key='feature.id' >
```

## #2 Use Actions: Commit the Data and Make API Calls

I make most of my API calls inside the Vuex actions because they make so much convenient to fetch the data and provide a level of reusability and encapsulation.



- If I am required to fetch the same web page on two different places, then with the help of the dispatcher and right parameters, I will be able to fetch, commit and return, with no duplicate code than the dispatcher.
- If I am required to apply the same logic when the page has already been fetched, I will do it one place to decrease the load on the server, and I am pretty sure that it will work everywhere.
- It is so much convenient to track actions into the Mixpanel events, and on the other hand, the code base is easy to maintain. Trust me; you will have a sense of satisfaction working this way.

## #3 Naming Commits – Follow a single Convention

Once the application grows, we all are required to browse the history of the components. If you or any of your team member has not followed the same convention to name their commits, it will become critical to identify and understand what each does. Follow the listed below guidelines as one of the Vue js best practices to make your commits easier when you are going through the project history.

 

**Commit Message Format**



```
< type >( <  scope > ): < subject >
< BLANK LINE >
< body >
< BLANK LINE >
< footer >
```

Sample:
docs(changelog): update changelog to beta.5
fix(release): need to depend on the latest rxjs and zone.js

 

To understand in detail how it works, go through this [guideline](https://www.telerik.com/blogs/10-good-practices-building-maintaining-large-vuejs-projects).



## #4 Multiple V-Condition

It is advisable never to use various v-if conditions to render multiple elements from a Vue component’s render function. Use the < div > to wrap the elements and < template > to wrap the extra element.



```
< template v-if=“true” >
 < p >Paragraph 1 < / p >
 < p >Paragraph 2 < / p >
 < p >Paragraph 3 < / p >
< / template >
```

## #5 Third-part packages

When a team of developers is working on the same project, the numbers of installed packages become so high that no one care to pay attention to it. It indirectly affects the performance of the application. To improve the performance, you can use import cost packages to have a look at the imported modular library and identify what’s wrong when it is growing.



## #6 Stay Consistent – Directive Shorthand

I have seen this Vue.js best practice as a common technique to use shorthand for directives.



- @ for v-on
- : for v-bind
- \# for v-slot

One of my favorite practices that I take into consideration. Here, you should be very careful that either you should use them throughout the project or better not use it from the start. Vue project structure best practices makes your project more consistent and your code readable.



## #7 Code Splitting

Performance matters, and once the application is getting large, it becomes more than important, makes it as fast and as efficient as possible.

 

**Async components**



```
Vue.component('async-component', (resolve) => {
  resolve({
    template: '< div >Async Component< / div >',
    props: [ 'myprop' ]
  });
});
```

**Single file components**



```
< template >
  < div >A sync Component < / div >
< / template >
< script >
  export default {
    props: [ 'myprop' ]
  }
< / script >
```

**This syntax for importing is even neater:**



```
new Vue({ 
  el: '#app',
  components: {
    AsyncComponent: () => import('./AsyncComponent.vue')
  }
});
```

**Dynamic Module Loading**



```
export default {
  template: '< div >Async Component< /div >',
  props: [ 'myprop' ]
}
```

**You may try something like this;**



```
import AsyncComponent from './AsyncComponent.js'`;
Vue.component('async-component', AsyncComponent);
```

You may also like: [Performance of Vue js Large Application Structure](https://www.bacancytechnology.com/blog/vue-js-large-application-structure)



## #8 Routing

At the time of building SPAs, it is most common to use client-side routing. Vue does not ship on built-in routing as it has official plugin called VueRouter and it so easy to work with and provides all the functionalities that you need to build a powerful application. Incase if you are using the VueCLI, you can add it to your application without installing npm-install Vue-router.



## #9 Avoid to Access the DOM Directly

While programming on the Vue application, by all means you should avoid accessing the DOM directly. Instead you should use $refs, I find it an ideal way to access the DOMand its more maintainable and you are no more required to depend on specific class names.



## #10 Add multiple classes to an element

One of the best things about Vue is it makes so convenient to add dynamic class to an element



```
//Add class red if isError is true
< div :class=”{'red': isError}” >< / div >
```

**A different yet most common and easy approach is;**



```
// Add to classes if two properties return true
< div :class="{'red': isError, 'text-bold': isActive }” >< / div >
```

## #11 kebab-case for event names

At the time of emitting and listening to custom events, make sure to use kebab-case. Kebab-case helps to transfer the events into lowercase. I haven’t seen anyone listening to an event in PascalCase or camelCase, so you should declare the event in a way you will going to listen to it: in kebab-case.



```
// Emitting
this.$emit('my-event') // instead of myEvent

// Listening
v-on:my-event
```

## #12 Use Selectors

It is better explained with code:



```vue
// We have this selector
export const language = (state) => state.userConfig.language;// In one of our actions, we need language:
// Bad
[GET_GAMES]({ commit, rootState }) {
   const lang = rootState.userConfig.language;
   // Do stuff...
}
// Good
[GET_GAMES]({ commit, rootState }) {
   const lang = language(rootState);
   // Do stuff...
}
```

Source: [Github](https://github.com/amandakelake/blog/issues/69)



## #13 Validate your Props

I wasn’t sure about this practice easier, I came to know about it very late, but one of the best practices to follow. When you are working on a large-scale project, it is not possible to remember the type, format, and conventions that you have used in a prop. So considering the below example in a similar way, you can write prop validation.



```vue
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

Source: [Vue– Style Guide](https://vuejs.org/v2/style-guide/)



## #14 Appropriate Structure

Vue has not any default way to structure the application unless you are using Nuxt. So it demands you and your team to be a very organized developer(s) to create an understandable structure, because changing it later is even more stressful and hustle.



## #15 Clean up after yourself.

At the time of designing SPA, it is quite obvious to build up memory usage; if you don’t eliminate instances, intervals, custom events, then there are chances that your app will become slow or maybe unresponsive.

 

**This could look something like:**



```vue
created() {
  refreshUserLoginTokenInterval(); //At created we start an interval to refresh
},
beforeDestroy () {
  destroyUserLoginInterval(); //Before component is destroyed, we clean up
}
```

To know more about avoiding memory leaks, please go through this [cookbook](https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html).



## #16 Wrapping Up

So, the above listed are the key strengths and Vue.js best practices that I am taking into consideration to create a stunning Vue.js application. I am sure every individual developer would have their own on best practices, so If you think I have missed any of Vuejs best practices 2021 that I should cover in this blog post, then feel free to comment below.

 

If you are looking for the best top-tier Vue.js developers to build a high-octane performance-obsessed real-time application who are well-versed with the above Vue.js best practices 2021, then hire Vue.js developer from us. We are a globally renowned [Vue.js development company](https://www.bacancytechnology.com/hire-vuejs-developer), and we have incorporated all the versions of Vue.js from 0.9 to 2.6 as our mainstream front-end technology.