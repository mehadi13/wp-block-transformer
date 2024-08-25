<?php
/*
Plugin Name: My React Gutenberg Block
Description: A custom Gutenberg block built with React.js.
Version: 1.0
Author: Your Name
*/

// Exit if accessed directly.
if (!defined('ABSPATH')) exit;

function my_react_gutenberg_block_register() {
    wp_register_script(
        'my-react-gutenberg-block',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor')
    );

    register_block_type('myplugin/my-react-gutenberg-block', array(
        'editor_script' => 'my-react-gutenberg-block',
    ));
}

add_action('init', 'my_react_gutenberg_block_register');




function write_text_to_file($blockName, $text_content) {
    $templatePluginDir = pluginDir();
    // $file = dirname(plugin_dir_path(__FILE__))."\\".$blockName.'\\template.json';
    $file = "C:\Users\PROGRAMMER DoICT\Local Sites\wp-dev\app\public\wp-content\plugins\\transform\\template.json";
    // Decode the JSON string into a PHP value
$data = json_decode($text_content, true);

// Encode the PHP value back into a pretty-printed JSON string
$formattedJsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

write_debug_log('filename::');
write_debug_log($file);
    if (file_put_contents($file, $formattedJsonString)) {
        write_debug_log("true");
        return true;
    } else {
        write_debug_log("false");
        return false;
    }
}



function handle_write_text_to_file() {
    register_rest_route('transform/v1', '/block', [
        'methods' => 'POST',
        'callback' => function (WP_REST_Request $request) {
            // echo $request;
            
            $template = $request->get_json_params()['template'];
            write_debug_log("Received a POST request ccccc");
            
            // $template = $data['template'];
            $blockName = 'test';
            // copyStaticFiles($blockName);
            // generateBloksJson($blockName);
            write_text_to_file($blockName, $template);
            return ['selected_theme' => 'success'];
        },
    ]);
}

add_action('rest_api_init', 'handle_write_text_to_file');

function pluginDir() {
    $curentPluginDir = plugin_dir_path(__FILE__);
    $pluginsDir = dirname($currentPluginDir);
    return $pluginsDir.'/guentwise/src';
}

// copy from template
function copyStaticFiles($blockName) {
    $templatePluginDir = pluginDir();
    write_debug_log($templatePluginDir);
    write_debug_log($templatePluginDir.'/'.$blockName.'/edit.js');
    copyFile($templatePluginDir.'/template/edit.js', $templatePluginDir.'/'.$blockName.'/edit.js');
    copyFile($templatePluginDir.'/template/editor.scss', $templatePluginDir.'/'.$blockName.'/editor.scss');
    copyFile($templatePluginDir.'/template/index.js', $templatePluginDir.'/'.$blockName.'/index.js');
    copyFile($templatePluginDir.'/template/render.php', $templatePluginDir.'/'.$blockName.'/render.php');
    copyFile($templatePluginDir.'/template/view.js', $templatePluginDir.'/'.$blockName.'/view.js');
    copyFile($templatePluginDir.'/template/style.scss', $templatePluginDir.'/'.$blockName.'/style.scss');
}
function copyFile($sourceFile, $destinationFile) {
    if (copy($sourceFile, $destinationFile)) {
        echo "File copied successfully.";
    } else {
        echo "Failed to copy the file.";
    }
}

function generateBloksJson($blockName) {
copyAndReplace($blockName, $blockName, 'wordpress', 'Gutemwise plugin\'s block '.$blockName,$templatePluginDir.'/template/block.json', $templatePluginDir.'/'.$blockName.'/block.json');
}

function copyAndReplace($name, $title, $icon, $description, $sourceFile, $destinationFile) {
    $values = [
        'name' => $name,
        'title' => $title,
        'icon' => $icon,
        'description' => $description
    ];
    
    // Read the template file
    $template = file_get_contents($sourceFile);
    
    // Replace placeholders with actual values
    $template = str_replace('{name}', $values['name'], $template);
    $template = str_replace('{title}', $values['title'], $template);
    $template = str_replace('{icon}', $values['icon'], $template);
    $template = str_replace('{description}', $values['description'], $template);
    
    // Write the result to block.json
    file_put_contents($destinationFile, $template);
    
    echo "block.json has been generated successfully.";
}

function write_debug_log($message) {
    $logFile = plugin_dir_path(__FILE__) . 'debug.log';
    $timestamp = date("Y-m-d H:i:s");
    $formattedMessage = "[" . $timestamp . "] " . $message . PHP_EOL;
    file_put_contents($logFile, $formattedMessage, FILE_APPEND);
}