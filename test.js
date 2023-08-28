let pkg={
    "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n\n  int i, n;\n  bool is_prime = true;\n\n  cout << \"Enter a positive integer: \";\n  cin >> n;\n\n  // 0 and 1 are not prime numbers\n  if (n == 0 || n == 1) {\n    is_prime = false;\n  }\n\n  // loop to check if n is prime\n  for (i = 2; i <= n/2; ++i) {\n    if (n % i == 0) {\n      is_prime = false;\n      break;\n    }\n  }\n\n  if (is_prime)\n    cout << n << \" is a prime number\";\n  else\n    cout << n << \" is not a prime number\";\n\n  return 0;\n}\n",
    "input": "17",
    "lang": "c_cpp"
}

function test()
{
    console.log("Entered")
    fetch("https://online-judge-r43h.onrender.com/compile", {
    method: "POST",
    body: JSON.stringify(pkg),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
console.log("success");
// console.log(data)
}).catch(err=>{
    // console.log(err);
    // cout<<"failed\n"; 
    console.log("failed");
    })
}
// test();
let x=setInterval(test, 10000);
