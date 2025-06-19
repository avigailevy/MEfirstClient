import { useState } from "react";
import { Projects } from "../projects/Projects";

export function Agent({ agent }) {

    return (
        <>
            <div class="component-1">
                <div class="rectangle-20"></div>
                <div class="david-shalom">{agent.name}</div>
                <div class="ellipse-19"></div>
                <div class="frame-50">                    
                    <div class="frame-47">
                        <div class="company">Tel:</div>
                        <div class="ivory">{agent.phone}</div>
                    </div>
                    <div class="frame-48">
                        <div class="company">Mail:</div>
                        <div class="ivory">{agent.email}</div>
                    </div>
                    <div class="frame-49">
                        <div class="company">Adress:</div>
                        <div class="ivory">{agent.address}</div>
                    </div>
                </div>
                <img class="edit-02" src="edit-020.svg" />
                <img class="trash-02" src="trash-020.svg" />
                <div class="frame-5">
                    <div class="details">{<Projects agentId={agent.user_id} />}</div>
                </div>
                <img class="play-03" src="play-030.svg" />
            </div>

        </>
    );
}