npm run build;

Remove-Item "D:\Todo\Programas\Xampp\htdocs\21\*" -Recurse;

Copy-Item "D:\Todo\Programas\Xampp\htdocs\Ejercicios\TFG-Bolsa-de-Trabajo\repo-github\BolsaTrabajo\build\*" -Destination "D:\Todo\Programas\Xampp\htdocs\21" -Recurse;
Copy-Item "D:\Todo\Programas\Xampp\htdocs\Ejercicios\TFG-Bolsa-de-Trabajo\repo-github\BolsaTrabajo\src\php" -Destination "D:\Todo\Programas\Xampp\htdocs\21\php" -Recurse;
Copy-Item "D:\Todo\Programas\Xampp\htdocs\Ejercicios\TFG-Bolsa-de-Trabajo\repo-github\BolsaTrabajo\vendor" -Destination "D:\Todo\Programas\Xampp\htdocs\21\vendor" -Recurse;
