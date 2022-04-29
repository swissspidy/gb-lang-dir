<?php
/**
 * Main functions.
 *
 * @package GBLangDir
 */

namespace GBLangDir;

/**
 * Enqueue scripts.
 *
 * @return void
 */
function enqueue_scripts() {
	$asset_file = include( plugin_dir_path( __DIR__ ) . 'build/main.asset.php' );

	wp_enqueue_script(
		'gb-lang-dir',
		plugins_url( 'build/main.js', __DIR__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_set_script_translations( 'gb-lang-dir', 'gb-lang-dir' );

	require_once ABSPATH . 'wp-admin/includes/translation-install.php';
	$translations = wp_get_available_translations();

	$languages = array_map(
		static function( $lang ) {
			return array(
				'value' => $lang['language'],
				'label' => $lang['native_name'],
			);
		},
		$translations
	);

	wp_localize_script(
		'gb-lang-dir',
		'gbLangDir',
		array(
			'availableLanguages' => array_values( $languages ),
		)
	);
}

/**
 * Add lang attribute to paragraph block.
 *
 * @param array $metadata Block metadata.
 *
 * @return array Filtered metadata
 */
function filter_metadata_registration( $metadata ) {
	if ( 'core/paragraph' !== $metadata['name'] ) {
		return $metadata;
	}

	$metadata['attributes']['lang'] = array(
		'type' => 'string',
	);

	return $metadata;
}
