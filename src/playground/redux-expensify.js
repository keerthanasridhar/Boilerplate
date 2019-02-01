import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
//---------------------ACTION GENERATORS--------------------------

//ADD_EXPENSE
const addExpense =({
  description='',
  note ='',
  amount=0,
  createdAt=0 }={}
)=> ({ type: 'ADD_EXPENSE',
        expense: {
        id:uuid(),
        description,
        note,
        amount,
        createdAt

  }
})
//REMOVE_EXPENSE
const removeExpense=({id}={})=>({
type: 'REMOVE_EXPENSE',
id
})


//EDIT_EXPENSE
const editExpense=(id,updates)=>({
type: 'EDIT_EXPENSE',
id,
updates
});
//SET_TEXT_FILTER
const setTextFilter=(text='')=>({
  type: 'SET_TEXT_FILTER',
  text
})
//SORT_BY_DATE
const sortByDate=()=>({
  type: 'SORT_BY_DATE'
  })

//SORT_BY_AMOUNT
const sortByAmount=()=>({
type: 'SORT_BY_AMOUNT'
})
//SET_START_DATE
const setStartDate=(startDate)=>({
  type: 'SET_BY_STARTDATE',
  startDate
})


//SET_END_DATE
const setEndDate=(endDate)=>({
  type: 'SET_BY_ENDDATE',
  endDate

})



//-----------------------------------------------
const expensesReducerDefaultState = []

const filterReduceDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

//---------------------REDUCER--------------------------
const expenseReducer = (state=expensesReducerDefaultState,action)=>{
  switch(action.type){
    case 'ADD_EXPENSE':
    return [
        ...state,
        action.expense
    ]
    case 'REMOVE_EXPENSE':
    return state.filter(({ id } )=>id!== action.id)
  default: 
    return state
    case 'EDIT_EXPENSE':
    return state.map((expense)=>{
      if(expense.id===action.id){
        return {
          ...expense,
          ...action.updates
        }
      } else {
        return expense;
      }
    })
  }
}

//filter reducer
const filterReducer = (state=filterReduceDefaultState,action)=>{
  switch(action.type){
    case 'SET_TEXT_FILTER':
    return {
      ...state,
      text: action.text
    }
    case 'SORT_BY_DATE' :
    return {
      ...state,
      sortBy:'Date'
    }
    case 'SORT_BY_AMOUNT':
    return {
      ...state,
      sortBy:'amount'
    }
    case 'SET_BY_STARTDATE': 
    return {
      ...state,
      startDate:action.startDate
    }
    case 'SET_BY_ENDDATE':
    return {
      ...state,
      endDate: action.endDate
    }
    default: 
      return state
    } 
}

//sorting done dring timestamps

//---------------------Show the expenses--------------------------

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate})=>{ 
  return expenses.filter((expense)=>{
    const startDateMatch = typeof startDate != 'number'||expenses.createdAt >=startDate;
    const endDateMatch = typeof endDate != 'number'||expenses.createdAt <=endDate ;
    let Text = expense.description.toLowerCase();
    const textMatch = Text.includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b)=>{ 
    if(sortBy === 'date'){
      return a.createdAt<b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    }
  });

};

//---------------------STORE--------------------------
const store = createStore(combineReducers({
  expenses: expenseReducer,
  filters:filterReducer
}));



store.subscribe(()=>{
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
  console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({description:'Rent',amount:100,createdAt:-21000}))
const expenseTwo =store.dispatch(addExpense({description:'Coffee',amount:300,createdAt: -1000}))
// //const expenseThree=store.dispatch(addExpense({description:'loan',amount:500}))

// store.dispatch(removeExpense({id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, {amount:500 }))

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(1000));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(0))

const demoState = {
  expenses: [{
    id: 'poijasdfhwer',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

