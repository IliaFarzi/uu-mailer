export class SampleEmail {
  readonly html_format = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f0f0f0;
    }
    .box {
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">
      <p>{{body}}</p>
    </div>
  </div>
</body>
</html>

    `;
}
