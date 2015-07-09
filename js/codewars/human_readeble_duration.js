var secondsIn = {
	"year": 31536000,
	"day": 24 * 3600,
	"hour": 3600,
	"minute": 60
};

function formatDuration(seconds) {
	var durations = [];

	function pluralize(num) {
		return num > 1 ? 's' : '';
	}
	function getDuration(durationType, seconds) {
		var duration = Math.floor(seconds / secondsIn[durationType]);
		if (duration > 0) {
			durations.push({'duration': duration + ' ' + durationType +
				pluralize(duration)});
		}
		return duration;
	}

	console.log(seconds);
	if (seconds == 0) {
		return "now";
	}
	var years = getDuration('year', seconds);
	seconds = years > 0 ? seconds - years * secondsIn['year'] : seconds;
	var days = getDuration('day', seconds);
	seconds = days > 0 ? seconds - days * secondsIn['day'] : seconds;
	var hours = getDuration('hour', seconds);
	seconds = hours > 0 ? seconds - hours * secondsIn['hour'] : seconds;
	var minutes = getDuration('minute', seconds);
	seconds = minutes > 0 ? seconds - minutes * secondsIn['minute'] : seconds;
	if (seconds > 0) {
		durations.push({'duration': seconds + ' second' + pluralize(seconds)});
	}

	return durations.reduce(function (previous, current, index, array) {
		console.log(current);
		return index === 0 ? previous + current['duration'] :
			(index === array.length - 1) ? (previous + " and " + current['duration']) :
				(previous + ", " + current['duration']);
	}, "");
}

describe("formatDuration", function () {
	it("should get duration", function () {
		//expect(formatDuration(32536005)).toEqual("1 second");

		expect(formatDuration(1)).toEqual("1 second");
		expect(formatDuration(62)).toEqual("1 minute and 2 seconds");
		expect(formatDuration(120)).toEqual("2 minutes");
		expect(formatDuration(3600)).toEqual("1 hour");
		expect(formatDuration(3662)).toEqual("1 hour, 1 minute and 2 seconds");

	})
});
