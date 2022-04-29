<?php
/**
 * Adds all plugin actions and filters.
 *
 * @package GBLangDir
 */

namespace GBLangDir;

use function add_filter;

add_filter( 'block_type_metadata', __NAMESPACE__ . '\filter_metadata_registration' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_scripts' );
