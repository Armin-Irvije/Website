# SSHELL: Simple Shell

## Summary

SShell is a shell program in C that runs basic command line executions and 
handling. The program's functionality involves reading user commands 
followed by tokenizing and parsing through the `tokenize()` function.
The individual tokens are processed by the `tokenHandler` state machine, which 
adds tokens based on the current state. The program will start in the 
`CMD_STATE` and transitions to flag or args states as needed. After the initial 
tokenization, the control moves to `command.c`, where an instance of the 
command struct is created. The program checks for flags, 
arguments, redirection, or piping. Flags are tallied, and arguments are stored.
Once the command struct is populated, the program iterates through a linked 
list, invoking `assert()` that leads to a `fork()`. In the child process, 
checks for redirection, piping, or appending are performed, followed by the 
execution of built-in functions and `execvp()`. Child process finishes 
and exit back to parent process.  

## Design

The program has a modular design, with the main functionality distributed 
between `sshell.c`, handling user input, and `command.c`, containing functions 
related to command execution. `sshell.c` handles user input, tokenizes input, 
manages pipes and redirection. This modular approach enhances readability and 
supports scalability making it easier with future extensions. `command.c` 
defines the structure `Command` and `CommandNode` to represent commands and 
linked list. We also implement command-related functions such as `execute()`, 
`buildCommand()`, and `createCommand()`. Functions are organized based on their 
responsibilities. The programs design demonstrates thought of organization of 
code with the use of structures, linked lists and state machines which all 
contributes to a well structed codebase.

## Tokenization

The `tokenize()` function divides the input command into tokens using whitespace 
as a delimiter. The state machine in `tokenHandler` processes these tokens, 
constructing the command structure. The `CMD_STATE` creates a new command and 
tranisitions to `ARG_STATE`. Inside the arg state we determine the type of token 
(flag, redirection, append, or argument). If we encounter `>`, `>>` , and `|`` we 
change to `REDIR_STATE`, `APP_STATE`, `PIPE_STATE` respectively. A state 
machine was chosen to organize specific actions within each state. Its 
adaptability to diverse inputs is what made it very useful for the program.

## Command Structure

A `Command` struct stores command name, flags, arguments, and indications of 
redirection or piping. Arrays were used for handling multiple flags and 
arguments. The decision to use a struct stems from the need to instantiate 
an object with all relevant variables. These structs are stored in a linked 
list (`CommandNode`), enabling the handling of an arbitrary number of pipelines. 
Linked list were used for the benefits of dynamic memory management and its 
ability to handle a variable number of commands without the need use a fixed 
size array. The `assert()` function is responsible for forking processes into 
parent and child. Pattern matching identifies built-in the commands otherwise 
`execvp()` is utilized. Commands access a `Command` struct node to 
retrieve arguments.

## Built-in Commands

The `cd` function changes the directory by checking for the necessary arguments
and using `chdir()`. For `pwd`, the C function `getcwd` retrieves the working 
directory, which is then printed to `stdout`. `sls` prints information on the 
directory and its files using `opendir()`, `readdir()`, and `stat` for file 
details.

## Output Redirection

The process for output redirection and appending allow the user to redirect the
standard out put to a file or append it. This is achieved through `REDIR_STATE`
and `APP_STATE` which checks if the token and determines if we need to open an 
existing file or create a new one. `fdRedir` is the file descriptor that is 
connected to the opening of the file. This variable is used to redirect the 
standard output to the specfiied file.

## Piping

Logic for piping is separated into distinct functions, enhancing code 
readability. `pipeHandler()` is a the function responsible for 
managing the piping logic. The function switches between states 
(`PIPE_BEGIN`, `PIPE`, `PIPE_END`) that determine the begining middle and end 
of the piping process. `PIPE_BEGIN` connects the standard output of the current
command to the write end of the new pipe. This allows the command's output to 
be fed into the pipe. `PIPE` connects standard output to the write end of the new 
pipe, which facilitates the flow of data between commands in the pipe. In each 
of the cases we use `dup2` to duplicate file descriptors connecting input 
and out to the appropriate part of the pipe. `fileDesc` is the two-d array 
used to store file descriptors connected to the pipes. The array keeps track 
of read and write ends of the pipes. The piping process enables output of 
one process to serve as the input of another improving functionality of the 
shell.

## Testing & Debugging Strategy

A `printVerbose` variable controls print statements throughout the code, aiding
in tracking the command execution process during testing. These statements 
proved crucial for debugging, providing a clear look into program flow. In the 
`tester.sh` file, additional `echo` statements were incorporated to display 
the expected `stdout` of the tester, facilitating debugging efforts. We also took
time to create more test cases that checked error management and edges case that
were not test in the initial tester file. The error management was conducted by
our `checkParseError`. This function checks parsing errors like missing commands
and improper metacharacters and absence of output file when piping. The errors 
are reported to `stderr`. 

## Conclusion

The SShell program is a well designed simple version of a bash shell
that effectively handles basic command line executions and various features 
such as tokenization, command struct representation, built-in commands, output 
redirection, and piping. The modular design, with distinct responsibilities 
assigned to different parts of the code, contributes to readability, 
maintainability, and scalability. The tokenization process efficiently processes
user input and constructs the command structure. The use of a state machine 
facilitates adaptability to diverse inputs. The command structure provides a 
flexible way to handle an arbitrary number of pipelines. The separation of 
logic into `main.c` and `command.c` enhances code organization. The testing and 
debugging strategy, including the use of a `printVerbose` variable and 
additional `echo` statements in the test script, illustrates a thoughtful 
approach to identifying and addressing issues. The creation of expanded 
test cases, including those for error management and edge cases,
ensured the robustness of the program. The SSHELL program showcases
an efficient approach to building a shell in C, providing a solid
foundation for potential further development and extension.