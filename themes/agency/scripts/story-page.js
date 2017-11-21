hexo.extend.generator.register('story-page', function (locals) {
    var stories = locals.data.stories;
    return stories.map(function (story) {
        return {
            path: `/stories/${story.name}/`,
            data: story,
            layout: 'story'
        }
    });
});
