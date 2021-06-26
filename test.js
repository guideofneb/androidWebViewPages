let rawStrArray = [String.raw`\text`, String.raw`\text\s\nn\n`]
console.log(rawStrArray);
rawStrArray.map((data) => {
    console.log(data);
})