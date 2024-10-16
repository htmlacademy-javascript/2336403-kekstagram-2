const EFFECTS_SET = [
  { name: 'none', style: 'none', min: 0, max: 100, step: 1, unit: ''},
  { name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  { name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  { name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
];

const defaultEffect = EFFECTS_SET[0];
let activeEffect = defaultEffect;

const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

const isDefaultEffect = () => activeEffect === defaultEffect;
const showSlider = () => imgUploadEffectLevel.classList.remove('hidden');
const hiddenSlider = () => imgUploadEffectLevel.classList.add('hidden');

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: activeEffect.min,
      max: activeEffect.max,
    },
    step: activeEffect.step,
    start: activeEffect.max,
  });

  if (isDefaultEffect()){
    hiddenSlider();
  } else {
    showSlider();
  }
};

const onEffectsListChange = (evt) => {
  activeEffect = EFFECTS_SET.find((effect) => effect.name === evt.target.value);
  imgUploadPreview.className = `effects__preview--${activeEffect.name}`;
  updateSlider();
};

const resetFilterEffect = () =>{
  activeEffect = defaultEffect;
  effectsList.removeEventListener('change', onEffectsListChange);
  effectLevelSlider.noUiSlider.destroy();
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  imgUploadPreview.style.filter = isDefaultEffect() ? defaultEffect.style : `${activeEffect.style}(${sliderValue}${activeEffect.unit})`;
  effectLevelValue.value = sliderValue;
};

const restartFilterEffect = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: defaultEffect.min,
      max: defaultEffect.max,
    },
    start: defaultEffect.max,
    step: defaultEffect.step,
  });

  effectsList.addEventListener('change', onEffectsListChange);
  effectLevelSlider.noUiSlider.on('update',onSliderUpdate);
  hiddenSlider();
};

export { restartFilterEffect, resetFilterEffect };
