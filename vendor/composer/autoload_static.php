<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitfae833cc0ed20409f603999d3cf7a880
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitfae833cc0ed20409f603999d3cf7a880::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitfae833cc0ed20409f603999d3cf7a880::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitfae833cc0ed20409f603999d3cf7a880::$classMap;

        }, null, ClassLoader::class);
    }
}