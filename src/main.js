import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	PanelRow,
	SelectControl,
} from '@wordpress/components';
import { __, _x, isRTL } from '@wordpress/i18n';

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if ('core/paragraph' !== props.name) {
			return BlockEdit;
		}

		const { setAttributes, attributes } = props;
		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<Panel>
						<PanelBody
							title={__('Language', 'gb-lang-dir')}
							initialOpen={true}
						>
							<PanelRow>
								<SelectControl
									label={__('Text Direction', 'gb-lang-dir')}
									options={[
										{
											value: 'ltr',
											label: _x(
												'Left to right',
												'text direction',
												'gb-lang-dir'
											),
										},
										{
											value: 'rtl',
											label: _x(
												'Right to left',
												'text direction',
												'gb-lang-dir'
											),
										},
									]}
									value={
										attributes.direction ||
										(isRTL() ? 'rtl' : 'ltr')
									}
									onChange={(newDirection) =>
										setAttributes({
											direction: newDirection,
										})
									}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label={__('Language', 'gb-lang-dir')}
									options={[
										{
											value: 'default',
											label: _x(
												'Default',
												'language',
												'gb-lang-dir'
											),
										},
										...window.gbLangDir.availableLanguages,
									]}
									value={attributes.lang || 'default'}
									onChange={(newLang) =>
										setAttributes({
											lang:
												newLang === 'default'
													? undefined
													: newLang,
										})
									}
								/>
							</PanelRow>
						</PanelBody>
					</Panel>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withInspectorControl');

addFilter(
	'editor.BlockEdit',
	'gb-lang-dir/with-inspector-controls',
	withInspectorControls
);

function addLangAttribute(props, block, attributes) {
	if ('core/paragraph' !== block.name) {
		return props;
	}

	if (attributes.lang) {
		props.lang = attributes.lang;
	}

	return props;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'gb-lang-dir/add-lang-attribute',
	addLangAttribute
);
