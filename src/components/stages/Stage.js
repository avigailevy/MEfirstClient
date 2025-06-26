
export function Stage({ stageNum, stageStat, stageName }) {

    return (
        <>
            <div class="frame-65">
                <div class="nudetails" title="stage number">{stageNum}</div>
                <div class="nudetails" title="stage name">{stageName}</div>
                <div class="nudetails" title="stage status">{stageStat}</div>
            </div>
        </>
    );
}