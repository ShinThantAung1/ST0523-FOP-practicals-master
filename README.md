# How to start the program for development:

1. Pull the repository [here](https://github.com/AcademicV1ctim/fop-practical-remote-execution)</li>

2. Run "npm run dev" in the terminal of the pulled repository above</li>

3. Using the live server extension, start a live server from these files.


# How to add questions to Mongodb:

Use the json template below, __filling in the data__.  
{
  "Topicid": ,  
  "Questionid": ,  
  "questionName": "",  
  "explanation": "",  
  "function": ""  
}

__Topicid__: the id of the topic for the question.  
__Questionid__: the id of the question.  
__questionName__: The name of the question. This should provide a brief description of what the question is about.  
__explanation__: Explaining how the code should function, as well as examples of inputs + outputs  
__function__: An autofilled portion of the code, providing the function name and inputs. Example: addNumbers(num1, num2){\n}  

__Note: Remember to type \n for line breaks in the explanation and function__

Adding Test Cases:

Use the json template below, filling the data.
{
  "Topicid": ,  
  "Questionid": ,  
  "input": [ ],  
  "expected_output":   
}

Topicid: id of the topic for the question  
Questionid: id of the question  
input: an array of test case inputs (the amount of items in the array depends on how many parameters are in the function) (in the case of function input, leave them as strings) Example: ["1", 2]  
expected_output: the expected return value of the test case. any data type is fine.  