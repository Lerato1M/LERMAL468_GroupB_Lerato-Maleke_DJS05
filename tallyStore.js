//File Name: tallyStore.js





// To define the action types
const ActionTypes = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
    RESET: 'RESET',
  };
  



  // To define the reducer function
  function reducer(state = { count: 0 }, action) {
    switch (action.type) {
      case ActionTypes.ADD:
        return { count: state.count + 1 };
      case ActionTypes.SUBTRACT:
        return { count: state.count - 1 };
      case ActionTypes.RESET:
        return { count: 0 };
      default:
        return state;
    }
  }



  
  //To create a store
  function createStore(reducer) {
    let state = reducer(undefined, {}); // Initialize state
    const subscribers = []; // Array to hold subscribers
  


    //To get the current state
    function getState() {
      return state;
    }
  
    // To dispatch the actions
    function dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach(subscriber => subscriber(state));
    }
  
    // To subscribe to state changes
    function subscribe(callback) {
      subscribers.push(callback);

      // To return unsubscribe function
      return () => {
        const index = subscribers.indexOf(callback);
        if (index !== -1) {
          subscribers.splice(index, 1);
        }
      };
    }
  
    return {
      getState,
      dispatch,
      subscribe,
    };
  }
  

  
  // To create store instance
  const store = createStore(reducer);
  
  // To test scenarios
  console.log("SCENARIO 1: Initial State Verification");
  const unsubscribe1 = store.subscribe(state => {
    console.log("Current State:", state.count);
  });
  console.log("Initial State:", store.getState().count);
  unsubscribe1();
  
  console.log("\nSCENARIO 2: Incrementing the Counter");
  const unsubscribe2 = store.subscribe(state => {
    console.log("Current State:", state.count);
  });
  store.dispatch({ type: ActionTypes.ADD });
  store.dispatch({ type: ActionTypes.ADD });
  unsubscribe2();
  
  console.log("\nSCENARIO 3: Decrementing the Counter");
  const unsubscribe3 = store.subscribe(state => {
    console.log("Current State:", state.count);
  });
  store.dispatch({ type: ActionTypes.SUBTRACT });
  unsubscribe3();
  
  console.log("\nSCENARIO 4: Resetting the Counter");
  const unsubscribe4 = store.subscribe(state => {
    console.log("Current State:", state.count);
  });
  store.dispatch({ type: ActionTypes.RESET });
  unsubscribe4();
  