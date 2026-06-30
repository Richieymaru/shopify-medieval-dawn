{% comment %}
Liquid Variables
{% endcomment %}

{% liquid
assign timer_section_title = section.settings.timer_section_title
assign timer_section_subtitle = section.settings.timer_section_subtitle

assign date_picker_time = section.settings.date_picker

assign cta_bg_color = section.settings.cta_bg_color
assign cta_text_color = section.settings.cta_text_color

assign title_text_color = section.settings.title_text_color
assign subtitle_text_color = section.settings.subtitle_text_color
assign subtitle_font_weight = section.settings.subtitle_font_weight

assign section_bg_color = section.settings.bg_color
assign timer_color = section.settings.timer_color
%}



{% comment %}
Custom CSS Styles
{% endcomment %}
{% style %}
    .timer-flex-container{
        background: {{ section_bg_color }};
        align-items: center;
        justify-content: center;
        column-gap: 20px;
        padding: 10px;
        display: flex;
        opacity: 1;
        transition: 0.5s all linear;
    }

    .hide-element{
        padding: 0 !important;
        opacity: 0;
    }

    .timer-flex-container .timer {
        display: flex;
        justify-content: space-around;
    }

    .timer-flex-container .timer-subtitle{
        text-align:center; margin: 5px 0;
    }

    .timer-flex-container .timer-subtitle{
        color: {{ subtitle_text_color }};
        font-weight: {{ subtitle_font_weight }};
        font-family: inherit;
        font-size: 18px;
    }

    .timer-flex-container .timer--expired {
        display: none;
    }

    .timer-flex-container .timer__title {
        text-align: center;
        font-weight: bold;
    }

    .timer-flex-container .timer-display {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: center;
        margin-top: 5px;
    }

    .timer-flex-container .timer{
        margin-right: 1rem;
    }

    .timer-flex-container .timer-block {
        position: relative;
        padding: 0 10px;
    }

    .timer-flex-container .timer-block__num,
    .timer-flex-container .timer-block__unit {
        display: block;
        text-align: center;
        color: {{ timer_color }};
        font-family: inherit;
    }

    .timer-flex-container .timer-block__num{
        font-size: 16px;
    }

    .timer-flex-container .timer-block__unit{
        font-size: 13px;
        margin-top: -7px;
    }

    .timer-flex-container .colon {
        font-size: 16px;
        color: {{ timer_color }};
    }

    .timer-flex-container .timer-button{
        max-height: 45px;
        background-color: {{ section.settings.cta_bg_color }} !important;
        color: {{ section.settings.cta_text_color }} !important;
        border-radius: 4px;
    }

    .timer-flex-container .timer-button::after{
        content: none;
    }

    .timer-display-flex{
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 768px){
        .timer-flex-container{
            flex-direction: column;
        }
    }

    @media screen and (max-width: 391px){
        .timer-display-flex{
            width: 100%;
            justify-content: space-evenly;
            flex-wrap: wrap;
        }
    }

{% endstyle %}

{% unless date_picker_time == blank %}
<div class="timer-flex-container hide-element">
    {% unless timer_section_title == blank %}
        <div class="timer-subtitle">{{ timer_section_title }}</div>
    {% endunless %}


    <div class = "timer-display-flex">
        <countdown-timer-bar schema-time="{{ date_picker_time }}">
            <div class="timer" style="visibility: hidden;">
                <div class="timer-display">
                    <div class="timer-block">
                        <span class="timer-block__num js-timer-days">00</span>
                        <span class="timer-block__unit">Days</span>
                    </div>

                    <div class="colon">:</div>

                    <div class="timer-block">
                        <span class="timer-block__num js-timer-hours">00</span>
                        <span class="timer-block__unit">Hrs</span>
                    </div>

                    <div class="colon">:</div>

                    <div class="timer-block">
                        <span class="timer-block__num js-timer-minutes">00</span>
                        <span class="timer-block__unit">Mins</span>
                    </div>

                    <div class="colon">:</div>

                    <div class="timer-block">
                        <span class="timer-block__num js-timer-seconds">00</span>
                        <span class="timer-block__unit">Secs</span>
                    </div>
                </div>
            </div>
        </countdown-timer-bar>

        {% unless section.settings.timer_section_btn_link == blank and timer_section_btn_text == blank %}
        <a class="timer-button button" href="{{ section.settings.timer_section_btn_link }}">
            <span>{{
                section.settings.timer_section_btn_text }}
            </span>
        </a>
        {% endunless %}
    </div>

    
</div>
{% endunless %}


{% comment %}
Native Web Component Definition
{% endcomment %}
{% javascript %}
class CountdownTimerBar extends HTMLElement {
    constructor() {
        super();
    }

    init() {
        this.schemaTime = this.getAttribute('schema-time');

        this.timer = this.querySelector(".timer")
        this.countdown = new Date(this.schemaTime).getTime();
        this.second = 1000;
        this.minute = this.second * 60;
        this.hour = this.minute * 60;
        this.day = this.hour * 24;

        this.timerInterval = null;
        this.startTimer();

        setTimeout(() => this.timer.style.visibility = "visible", 1000)
    }

    padWithLeadingZero = (number) => {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    };

    isDateInPast(date) {
        const now = new Date();
        return date < now;
    }


    startTimer() {
        //Have quick check to see if Date input in the countdown class variable is in the past
        //Helper function

        const timerElem = this.timer
        this.timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = this.countdown - now;

            const dayCalc = Math.floor(distance / this.day);
            const hourCalc = Math.floor((distance % this.day) / this.hour);
            const minuteCalc = Math.floor((distance % this.hour) / this.minute);
            const secondCalc = Math.floor((distance % this.minute) / this.second);

            timerElem.querySelector('.js-timer-days').textContent = this.padWithLeadingZero(dayCalc);
            timerElem.querySelector('.js-timer-hours').textContent = this.padWithLeadingZero(hourCalc);
            timerElem.querySelector('.js-timer-minutes').textContent = this.padWithLeadingZero(minuteCalc);
            timerElem.querySelector('.js-timer-seconds').textContent = this.padWithLeadingZero(secondCalc);
        }, this.second);
    }

    disconnectedCallback() {
        clearInterval(this.timerInterval);
    }

    connectedCallback(){
        this.init();
        console.log("countdown timer was added to the page")
        
        const timerFlexContainer = window.document.querySelector(".timer-flex-container")
        const timerElem = this.timer

        const pastDate = this.isDateInPast(this.countdown)
        if(pastDate){
            timerFlexContainer.remove()
            this.remove()
        }
        window.setTimeout(() => {
            timerFlexContainer.classList.remove("hide-element")
        }, 2000);
    }

    disconnectedCallback(){
        console.log("The Timer date has passed so the timer was removed")
    }
}

customElements.define('countdown-timer-bar', CountdownTimerBar);
{% endjavascript %}


    {% comment %}
    Section Customization Options
    {% endcomment %}
    {% schema %}
    {
        "name": "Countdown Top Bar",
        "tag": "section",
        "enabled_on": {
            "groups": ["header"]
        },
        "settings": [
            {
                "type": "header",
                "content": "General Section Settings"
            },
            {
                "type": "color",
                "id": "bg_color",
                "default": "#fff",
                "label": "Section Background Color"
            },
            {
                "type": "header",
                "content": "Title Settings"
            },
            {
                "type": "text",
                "id": "timer_section_title",
                "label": "Section Title",
                "default": "Hurry up! Sale ends in:"
            },
            {
                "type": "color",
                "id": "subtitle_text_color",
                "default": "#000",
                "label": "Section Title Text Color"
            },
            {
                "type": "select",
                "id": "subtitle_font_weight",
                "default": "500",
                "label": "Normal or Bolded Text",
                "options": [
                    {
                        "label": "Normal",
                        "value": "500"
                    },
                    {
                        "label": "Bold",
                        "value": "700"
                    }
                ]
            },
            {
                "type": "header",
                "content": "Timer Settings"
            },
            {
                "type": "text",
                "id": "date_picker",
                "label": "Choose a date",
                "info": "Input date in this format: 07/21/2023. When date is in past section will disappear"
            },
            {
                "type": "color",
                "id": "timer_color",
                "default": "#000",
                "label": "Timer Color"
            },
            {
                "type": "header",
                "content": "Button Settings"
            },
            {
                "type": "url",
                "id": "timer_section_btn_link",
                "label": "Call to Action Button Link"
            },
            {
                "type": "text",
                "id": "timer_section_btn_text",
                "label": "Call to Action Button Text",
                "default": "Shop Now!"
            },
            {
                "type": "color",
                "id": "cta_bg_color",
                "default": "#4770db",
                "label": "Call to Action Background Color"
            },
            {
                "type": "color",
                "id": "cta_text_color",
                "default": "#fff",
                "label": "Call to Action Text Color"
            }
        ],
        "presets": [
            {
                "name": "Countdown Top Bar"
            }
        ]
    }
    {% endschema %}
