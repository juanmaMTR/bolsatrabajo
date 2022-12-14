npm run build;

Remove-Item "C:\Xampp\htdocs\21\*" -Recurse;

Copy-Item "C:\Xampp\htdocs\bolsatrabajo\src\assets\imgs\" -Destination "C:\Xampp\htdocs\21\assets\imgs\" -Recurse;
Copy-Item "C:\Xampp\htdocs\bolsatrabajo\build\*" -Destination "C:\Xampp\htdocs\21" -Recurse;
Copy-Item "C:\Xampp\htdocs\bolsatrabajo\src\php" -Destination "C:\Xampp\htdocs\21\php" -Recurse;
Copy-Item "C:\Xampp\htdocs\bolsatrabajo\vendor" -Destination "C:\Xampp\htdocs\21\vendor" -Recurse;
